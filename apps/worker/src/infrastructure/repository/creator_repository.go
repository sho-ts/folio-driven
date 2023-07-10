package repository

import (
	"errors"
	"fmt"
	"github.com/sho-ts/folio-driven/src/domain/entity"
	"github.com/sho-ts/folio-driven/src/infrastructure/dao"
)

type ICreatorRepository interface {
	Create(creator *entity.Creator) error
}

type CreatorRepository struct {
	db dao.IDatabase
}

func NewCreatorRepository(db dao.IDatabase) *CreatorRepository {
	return &CreatorRepository{
		db,
	}
}

func (r *CreatorRepository) Create(creator *entity.Creator) error {
	result := r.db.GetConnection().Exec("INSERT INTO creator SET creatorId = ?, displayName = ?, cognitoId = ?",
		creator.CreatorId.Value,
		creator.DisplayName.Value,
		creator.CognitoId.Value,
	)

	if result.Error != nil {
		fmt.Println(result.Error)
		return errors.New("CreatorのInsertに失敗しました。\nCreatorId: " + creator.CreatorId.Value + "\nCognitoId: " + creator.CognitoId.Value)
	}

	return nil
}
