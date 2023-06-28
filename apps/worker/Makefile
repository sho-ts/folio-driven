.PHONY: build clean deploy

build:
	export GO111MODULE=on
	go env GOARCH=amd64 GOOS=linux
	go build -ldflags="-s -w" -o bin/register_user src/handler/register_user/main.go

run-register_user:
	./node_modules/.bin/serverless invoke local --docker -f register_user -d {}

clean:
	rm -rf ./bin ./vendor go.sum

deploy: clean build
	sls deploy --verbose