package entity

import (
	cognito_user_object "github.com/sho-ts/folio-driven/src/domain/object/cognito_user"
	creator_object "github.com/sho-ts/folio-driven/src/domain/object/creator"
)

type Creator struct {
	CognitoId   *cognito_user_object.CognitoId
	CreatorId   *creator_object.CognitoId
	DisplayName *creator_object.DisplayName
}
