package entity

import object "github.com/sho-ts/folio-driven/src/domain/object/cognito_user"

type CognitoUser struct {
	CognitoId *object.CognitoId
	Email     *object.Email
	UserType  *object.UserType
}
