package search

import (
	"strings"

	"github.com/photoprism/photoprism/internal/entity"
	"github.com/photoprism/photoprism/internal/entity/sortby"
	"github.com/photoprism/photoprism/internal/form"
	"github.com/photoprism/photoprism/pkg/rnd"
	"github.com/photoprism/photoprism/pkg/txt"
)

// Users finds registered users.
func Users(frm form.SearchUsers) (result entity.Users, err error) {
	result = entity.Users{}
	stmt := Db()

	if frm.Deleted {
		stmt.Unscoped()
	}

	search := strings.TrimSpace(frm.Query)
	sortOrder := frm.Order
	limit := frm.Count
	offset := frm.Offset

	if search == "all" {
		// Don't filter.
	} else if id := txt.Int(search); id != 0 {
		stmt = stmt.Where("id = ?", id)
	} else if rnd.IsUID(search, entity.UserUID) {
		stmt = stmt.Where("user_uid = ?", search)
	} else if search != "" {
		stmt = stmt.Where("user_name LIKE ? OR user_email LIKE ? OR display_name LIKE ?", search+"%", search+"%", search+"%")
	} else {
		stmt = stmt.Where("id > 0")
	}

	switch sortOrder {
	case sortby.Name:
		sortOrder = "user_name, id"
	case sortby.DisplayName:
		sortOrder = "display_name, id"
	case sortby.Login, sortby.LoginAt:
		sortOrder = "login_at DESC, id"
	case sortby.Created, sortby.CreatedAt:
		sortOrder = "created_at ASC, id"
	case sortby.Updated, sortby.UpdatedAt:
		sortOrder = "updated_at DESC, id"
	case sortby.Deleted, sortby.DeletedAt:
		sortOrder = "deleted_at DESC, created_at DESC, id"
	case sortby.Email:
		sortOrder = "user_email, id"
	default:
		sortOrder = "user_name, id"
	}

	if limit > 0 {
		stmt = stmt.Limit(limit)

		if offset > 0 {
			stmt = stmt.Offset(offset)
		}
	}

	err = stmt.Order(sortOrder).Find(&result).Error

	return result, err
}
