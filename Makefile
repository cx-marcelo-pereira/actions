check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
      $(error Undefined $1$(if $2, ($2))))

## initialize git local configuration
init-git:
	$(call check_defined, GH_USER)
	$(call check_defined, GH_EMAIL)
	$(call check_defined, GH_COMMIT_SIGNING_KEY)
	$(info ==>> init: git : configuration)
	@git config --local commit.gpgsign true
	@git config --local gpg.format ssh 
	@git config --local user.name ${GH_USER}
	@git config --local user.email ${GH_EMAIL}
	@git config --local user.signingkey ${GH_COMMIT_SIGNING_KEY}
	$(info ==>> init: git : hooks)
	@commitlint install > /dev/null 2>&1
	@cp dev/hooks/pre-commit.sh .git/hooks/pre-commit
	@cp dev/hooks/pre-push.sh .git/hooks/pre-push
	@chmod 755 .git/hooks/pre-commit
	@chmod 755 .git/hooks/pre-push
	$(info ==>> init: git : credentials)
	@echo "machine github.com\n\tlogin ${GH_USER}\n\tpassword ${GH_TOKEN}" > ~/.netrc


## initialize go required libraries
init-dependencies:
	$(info ==>> init: dependencies : install and config commitlint )
	@go install github.com/jurienhamaker/commitlint/cmd/commitlint@v1.9.0
	@commitlint install > /dev/null 2>&1

init: init-dependencies init-git