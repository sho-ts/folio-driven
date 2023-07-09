package output

import (
	"github.com/sho-ts/folio-driven/src/domain/entity"
	"github.com/sho-ts/folio-driven/src/domain/object/cognito_user"
)

type RegisterUserOutput struct {
	Creator   *entity.Creator
	CognitoId *object.CognitoId
	UserType  *object.UserType
}

func NewRegisterUserOutput(creator *entity.Creator, cognitoId *object.CognitoId, userType *object.UserType) *RegisterUserOutput {
	return &RegisterUserOutput{
		Creator:   creator,
		CognitoId: cognitoId,
		UserType:  userType,
	}
}
