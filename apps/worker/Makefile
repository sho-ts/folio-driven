.PHONY: build clean deploy

build:
	export GO111MODULE=on
	GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o bin/register_user src/function/register_user/main.go

clean:
	rm -rf ./bin ./vendor go.sum
	go mod tidy

deploy: build
	npx sls deploy --verbose --stage dev

run-register_user:
	make build && npx sls invoke local --docker -f register_user --path ./src/function/register_user/event.json