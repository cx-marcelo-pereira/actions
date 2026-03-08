package main

import (
	"fmt"
	"os"
)

func main() {

	inputDependenciesToUpdate := os.Getenv("INPUT_DEPENDENCIES-TO-UPDATE")
	println(fmt.Sprintf("'%s'", inputDependenciesToUpdate))

	os.Environ()

	for _, v := range os.Environ() {
		println(v)
	}
}
