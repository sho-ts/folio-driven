package object

import (
	"errors"
	"strconv"
)

const (
	USER_TYPE_CREATOR = 1
	USER_TYPE_COMPANY = 2
)

type UserType struct {
	Value int64
}

func NewUserType(value string) (*UserType, error) {
	if value == "" {
		return nil, errors.New("UserTypeをインスタンス化する際のvalueが空です。")
	}

	// UsetAttributesは文字列で渡されるが、int型にしたいので変換する
	parsed_value, err := strconv.ParseInt(value, 10, 8)
	if err != nil {
		return nil, err
	}

	// 不正値チェック
	switch parsed_value {
	case USER_TYPE_CREATOR:
		fallthrough
	case USER_TYPE_COMPANY:
		return &UserType{
			Value: parsed_value,
		}, nil
	}

	return nil, errors.New("UserTypeが不正な値です。")
}
