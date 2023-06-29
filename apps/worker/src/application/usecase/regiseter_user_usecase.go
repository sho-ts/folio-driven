package usecase

import (
	"github.com/sho-ts/folio-driven/src/application/input"
	"github.com/sho-ts/folio-driven/src/application/output"
	"github.com/sho-ts/folio-driven/src/domain/entity"
)

type RegisterUserUseCase struct{}

func NewRegisterUseCase() *RegisterUserUseCase {
	return &RegisterUserUseCase{}
}

func (u *RegisterUserUseCase) Handle(input *input.RegisterUserInput) (*output.RegisteruserOutput, error) {
	cognitoUser := entity.CognitoUser{
		CognitoId: input.CognitoId,
		Email:     input.Email,
		UserType:  input.UserType,
	}

	return output.NewRegisterUserOutput(&cognitoUser), nil
}
