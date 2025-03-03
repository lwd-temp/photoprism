package duf

var (
	all         = false
	hideDevices = ""
	hideFs      = ""
	hideMp      = ""
	onlyDevices = ""
	onlyFs      = ""
	onlyMp      = ""
)

// FilterOptions contains all filters.
type FilterOptions struct {
	HiddenDevices map[string]struct{}
	OnlyDevices   map[string]struct{}

	HiddenFilesystems map[string]struct{}
	OnlyFilesystems   map[string]struct{}

	HiddenMountPoints map[string]struct{}
	OnlyMountPoints   map[string]struct{}
}
