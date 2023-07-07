package output

import (
	"github.com/sho-ts/folio-driven/src/domain/entity"
	"github.com/sho-ts/folio-driven/src/domain/object/cognito_user"
)

type RegisteruserOutput struct {
	Creator   *entity.Creator
	CognitoId *object.CognitoId
	UserType  *object.UserType
}

func NewRegisterUserOutput(creator *entity.Creator, cognitoId *object.CognitoId, userType *object.UserType) *RegisteruserOutput {
	return &RegisteruserOutput{
		Creator:   creator,
		CognitoId: cognitoId,
		UserType:  userType,
	}
}
