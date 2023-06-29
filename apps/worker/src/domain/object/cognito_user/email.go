package object

import "errors"

type Email struct {
	Value string
}

func NewEmail(value string) (*Email, error) {
	if value == "" {
		return nil, errors.New("Emailをインスタンス化する際のvalueが空です。")
	}

	return &Email{
		Value: value,
	}, nil
}
