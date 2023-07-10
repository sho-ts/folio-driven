package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/sho-ts/folio-driven/src/application/input"
	"github.com/sho-ts/folio-driven/src/application/usecase"
	"github.com/sho-ts/folio-driven/src/infrastructure/dao"
	"github.com/sho-ts/folio-driven/src/infrastructure/repository"
)

// 初期化
func bootstrap() *usecase.RegisterUserUseCase {
	db := dao.NewDatabase()
	creatorRepository := repository.NewCreatorRepository(db)
	interactor := usecase.NewRegisterUserUseCase(creatorRepository)

	return interactor
}

// Cognito新規登録時にDBにデータを登録する
func Handler(ctx context.Context, event events.CognitoEventUserPoolsPostConfirmation) (*events.CognitoEventUserPoolsPostConfirmation, error) {
	interactor := bootstrap()

	i, err := input.NewRegisterUserInput(event)
	if err != nil {
		return nil, err
	}

	o, err := interactor.Handle(i)
	if err != nil {
		return nil, err
	}

	fmt.Println("登録完了\nCognitoId: ", o.CognitoId.Value, "\nUserType: ", o.UserType.Value)

	return &event, nil
}

func main() {
	lambda.Start(Handler)
}
