package usecase

import (
	"github.com/google/uuid"
	"github.com/sho-ts/folio-driven/src/application/input"
	"github.com/sho-ts/folio-driven/src/application/output"
	"github.com/sho-ts/folio-driven/src/domain/entity"
	"github.com/sho-ts/folio-driven/src/domain/object/creator"
	"github.com/sho-ts/folio-driven/src/infrastructure/repository"
)

type RegisterUserUseCase struct {
	creatorRepository repository.ICreatorRepository
}

func NewRegisterUserUseCase(creatorRepository repository.ICreatorRepository) *RegisterUserUseCase {
	return &RegisterUserUseCase{
		creatorRepository: creatorRepository,
	}
}

func (u *RegisterUserUseCase) Handle(input *input.RegisterUserInput) (*output.RegisterUserOutput, error) {
	displayName, err := object.NewDisplayName(uuid.NewString())
	if err != nil {
		return nil, err
	}

	creatorId, err := object.NewCreatorId(uuid.NewString())
	if err != nil {
		return nil, err
	}

	creator := entity.Creator{
		CognitoId:   input.CognitoId,
		CreatorId: creatorId,
		DisplayName: displayName,
	}

	err = u.creatorRepository.Create(&creator)
	if err != nil {
		return nil, err
	}

	return output.NewRegisterUserOutput(&creator, input.CognitoId, input.UserType), nil
}
