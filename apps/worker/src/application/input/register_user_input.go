package input

import (
	"github.com/aws/aws-lambda-go/events"
	object "github.com/sho-ts/folio-driven/src/domain/object/cognito_user"
)

type RegisterUserInput struct {
	CognitoId *object.CognitoId
	Email     *object.Email
	UserType  *object.UserType
}

func NewRegisterUserInput(event events.CognitoEventUserPoolsPreSignup) (*RegisterUserInput, error) {
	cognito_id, err := object.NewCognitoId(event.Request.UserAttributes["sub"])
	if err != nil {
		return nil, err
	}

	email, err := object.NewEmail(event.Request.UserAttributes["email"])
	if err != nil {
		return nil, err
	}

	user_type, err := object.NewUserType(event.Request.UserAttributes["user_type"])
	if err != nil {
		return nil, err
	}

	return &RegisterUserInput{
		CognitoId: cognito_id,
		Email:     email,
		UserType:  user_type,
	}, nil
}
