package object

import (
	"errors"
)

type DisplayName struct {
	Value string
}

func NewDisplayName(value string) (*DisplayName, error) {
	if value == "" {
		return nil, errors.New("DisplayNameをインスタンス化する際のvalueが空です。")
	}

	return &DisplayName{
		Value: value,
	}, nil
}
