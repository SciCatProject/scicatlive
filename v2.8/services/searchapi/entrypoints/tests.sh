#!/bin/sh

## Setting an empty FACILITY makes the test pass as the mock implementation 
## in the tests is not compatible with newer nodes versions
FACILITY="" npm run test
