package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/sho-ts/folio-driven/src/application/input"
	"github.com/sho-ts/folio-driven/src/application/usecase"
)

// Cognito新規登録時にDBにデータを登録する
func Handler(ctx context.Context, event events.CognitoEventUserPoolsPostConfirmation) (*events.CognitoEventUserPoolsPostConfirmation, error) {
	i, err := input.NewRegisterUserInput(event)
	if err != nil {
		return nil, err
	}

	o, err := usecase.NewRegisterUseCase().Handle(i)
	if err != nil {
		return nil, err
	}

	fmt.Println("登録完了\nCognitoId: ", o.CognitoUser.CognitoId.Value, "\nUserType: ", o.CognitoUser.UserType.Value)

	return &event, nil
}

func main() {
	lambda.Start(Handler)
}
