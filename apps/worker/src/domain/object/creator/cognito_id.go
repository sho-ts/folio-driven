package object

import (
	"errors"
)

type CognitoId struct {
	Value string
}

func NewCognitoId(value string) (*CognitoId, error) {
	if value == "" {
		return nil, errors.New("CognitoIdをインスタンス化する際のvalueが空です。")
	}

	return &CognitoId{
		Value: value,
	}, nil
}
