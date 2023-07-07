package object

import (
	"errors"
)

type CreatorId struct {
	Value string
}

func NewCreatorId(value string) (*CreatorId, error) {
	if value == "" {
		return nil, errors.New("CreatorIdをインスタンス化する際のvalueが空です。")
	}

	return &CreatorId{
		Value: value,
	}, nil
}
