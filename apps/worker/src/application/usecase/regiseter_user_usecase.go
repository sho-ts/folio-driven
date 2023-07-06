package usecase

import (
	"github.com/sho-ts/folio-driven/src/application/input"
	"github.com/sho-ts/folio-driven/src/application/output"
	"github.com/sho-ts/folio-driven/src/domain/entity"
	"github.com/sho-ts/folio-driven/src/infrastructure/repository"
)

type RegisterUserUseCase struct {
	creatorRepository repository.ICreatorRepository
}

func NewRegisterUseCase(creatorRepository repository.ICreatorRepository) *RegisterUserUseCase {
	return &RegisterUserUseCase{
		creatorRepository: creatorRepository,
	}
}

func (u *RegisterUserUseCase) Handle(input *input.RegisterUserInput) (*output.RegisteruserOutput, error) {
	cognitoUser := entity.CognitoUser{
		CognitoId: input.CognitoId,
		Email:     input.Email,
		UserType:  input.UserType,
	}

	return output.NewRegisterUserOutput(&cognitoUser), nil
}
