package repository

import (
	"fmt"
	"github.com/sho-ts/folio-driven/src/domain/entity"
	"gorm.io/gorm"
)

type ICreatorRepository interface {
	Create(creator *entity.CognitoUser) error
}

type CreatorRepository struct {
	db *gorm.DB
}

func NewCreatorRepository(db *gorm.DB) *CreatorRepository {
	return &CreatorRepository{
		db,
	}
}

func (r *CreatorRepository) Create(creator *entity.Creator) error {
	result := r.db.Exec("INSERT INTO creator SET creatorId = ?, displayName = ?, cognitoId = ?",
		creator.CreatorId.Value,
		creator.DisplayName,
		creator.CognitoId,
	)

	if result.Error != nil {
		fmt.Println("CreatorのInsertに失敗しました。\nCreatorId: ", creator.CreatorId.Value, "\nCognitoId: ", creator.CognitoId.Value)
		return result.Error
	}

	return nil
}
