.PHONY: build clean deploy

build:
	export GO111MODULE=on
	go env GOARCH=amd64 GOOS=linux
	go build -ldflags="-s -w" -o bin/register_user src/function/register_user/main.go

run-register_user:
	make build && npx sls invoke local --docker -f register_user --path ./src/function/register_user/event.json

clean:
	rm -rf ./bin ./vendor go.sum

deploy: clean build
	sls deploy --verbose