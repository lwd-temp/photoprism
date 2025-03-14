package photoprism

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/photoprism/photoprism/internal/config"
)

func TestMediaFile_TimeZone(t *testing.T) {
	t.Run("/elephants.jpg", func(t *testing.T) {
		conf := config.TestConfig()

		img, err := NewMediaFile(conf.ExamplesPath() + "/elephants.jpg")

		assert.Nil(t, err)

		zone := img.TimeZone()

		assert.Nil(t, err)
		assert.Equal(t, "Africa/Johannesburg", zone)
	})
}
