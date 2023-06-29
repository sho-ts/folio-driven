package output

import "github.com/sho-ts/folio-driven/src/domain/entity"

type RegisteruserOutput struct{
	CognitoUser *entity.CognitoUser
}

func NewRegisterUserOutput(cognitoUser *entity.CognitoUser) *RegisteruserOutput {
	return &RegisteruserOutput{
		CognitoUser: cognitoUser,
	}
}
