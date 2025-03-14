package video

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/photoprism/photoprism/pkg/fs"
	"github.com/photoprism/photoprism/pkg/media"
	"github.com/photoprism/photoprism/pkg/media/http/header"
)

func TestProbeFile(t *testing.T) {
	t.Run("PathName", func(t *testing.T) {
		fileName := "testdata"
		info, err := ProbeFile(fileName)
		require.Error(t, err)
		require.NotNil(t, info)
	})
	t.Run("NotFound", func(t *testing.T) {
		fileName := "testdata/invalid"
		info, err := ProbeFile(fileName)
		require.Error(t, err)
		require.NotNil(t, info)
	})
	t.Run("mp4v-avc1.mp4", func(t *testing.T) {
		fileName := "testdata/mp4v-avc1.mp4"
		info, err := ProbeFile(fileName)
		require.NoError(t, err)
		require.NotNil(t, info)

		assert.Equal(t, fileName, info.FileName)
		assert.Equal(t, int64(55061), info.FileSize)
		assert.Equal(t, fs.VideoMp4, info.FileType)
		assert.Equal(t, Mp4, info.VideoType)
		assert.Equal(t, int64(0), info.VideoOffset)
		assert.Equal(t, int64(-1), info.ThumbOffset)
		assert.Equal(t, media.Video, info.MediaType)
		assert.Equal(t, CodecAvc1, info.VideoCodec)
		assert.Equal(t, header.ContentTypeMp4, info.VideoMimeType)
		assert.Equal(t, header.ContentTypeMp4AvcMain, info.VideoContentType())
		assert.Equal(t, "810.0081ms", info.Duration.String())
		assert.InEpsilon(t, 0.81, info.Duration.Seconds(), 0.01)
		assert.Equal(t, 1, info.Tracks)
		assert.Equal(t, 640, info.VideoWidth)
		assert.Equal(t, 416, info.VideoHeight)
		assert.Equal(t, 24, info.Frames)
		assert.Equal(t, 30.0, info.FPS)
		assert.Equal(t, false, info.Encrypted)
		assert.Equal(t, true, info.FastStart)
		assert.Equal(t, true, info.Compatible)
	})
	t.Run("mp42-hvc1.mp4", func(t *testing.T) {
		fileName := "testdata/mp42-hvc1.mp4"
		info, err := ProbeFile(fileName)
		require.NoError(t, err)
		require.NotNil(t, info)

		assert.Equal(t, fileName, info.FileName)
		assert.Equal(t, int64(217963), info.FileSize)
		assert.Equal(t, fs.VideoMp4, info.FileType)
		assert.Equal(t, Mp4, info.VideoType)
		assert.Equal(t, int64(0), info.VideoOffset)
		assert.Equal(t, int64(-1), info.ThumbOffset)
		assert.Equal(t, media.Video, info.MediaType)
		assert.Equal(t, CodecAvc1, info.VideoCodec)
		assert.Equal(t, header.ContentTypeMp4, info.VideoMimeType)
		assert.Equal(t, header.ContentTypeMp4AvcMain, info.VideoContentType())
		assert.Equal(t, "1.066666666s", info.Duration.String())
		assert.InEpsilon(t, 1.066, info.Duration.Seconds(), 0.01)
		assert.Equal(t, 2, info.Tracks)
		assert.Equal(t, 464, info.VideoWidth)
		assert.Equal(t, 848, info.VideoHeight)
		assert.Equal(t, 32, info.Frames)
		assert.Equal(t, 30.0, info.FPS)
		assert.Equal(t, false, info.Encrypted)
		assert.Equal(t, false, info.FastStart)
		assert.Equal(t, true, info.Compatible)
	})
	t.Run("quicktime-hvc1.mov", func(t *testing.T) {
		fileName := "testdata/quicktime-hvc1.mov"
		info, err := ProbeFile(fileName)
		require.NoError(t, err)
		require.NotNil(t, info)

		assert.Equal(t, fileName, info.FileName)
		assert.Equal(t, int64(710953), info.FileSize)
		assert.Equal(t, fs.VideoMov, info.FileType)
		assert.Equal(t, Mov, info.VideoType)
		assert.Equal(t, int64(0), info.VideoOffset)
		assert.Equal(t, int64(-1), info.ThumbOffset)
		assert.Equal(t, media.Video, info.MediaType)
		assert.Equal(t, CodecHvc1, info.VideoCodec)
		assert.Equal(t, header.ContentTypeMov, info.VideoMimeType)
		assert.Equal(t, header.ContentTypeMp4HvcMain10, info.VideoContentType())
		assert.Equal(t, "1.166666666s", info.Duration.String())
		assert.InEpsilon(t, 1.166, info.Duration.Seconds(), 0.01)
		assert.Equal(t, 5, info.Tracks)
		assert.Equal(t, 0, info.VideoWidth)
		assert.Equal(t, 0, info.VideoHeight)
		assert.Equal(t, 35, info.Frames)
		assert.Equal(t, 30.0, info.FPS)
		assert.Equal(t, false, info.Encrypted)
		assert.Equal(t, false, info.FastStart)
		assert.Equal(t, true, info.Compatible)
	})
	t.Run("quicktime-jpeg.mov", func(t *testing.T) {
		fileName := "testdata/quicktime-jpeg.mov"
		info, err := ProbeFile(fileName)
		require.NoError(t, err)
		require.NotNil(t, info)

		assert.Equal(t, fileName, info.FileName)
		assert.Equal(t, int64(475190), info.FileSize)
		assert.Equal(t, fs.VideoMov, info.FileType)
		assert.Equal(t, Unknown, info.VideoType)
		assert.Equal(t, int64(-1), info.VideoOffset)
		assert.Equal(t, int64(-1), info.ThumbOffset)
		assert.Equal(t, media.Video, info.MediaType)
		assert.Equal(t, CodecUnknown, info.VideoCodec)
		assert.Equal(t, header.ContentTypeBinary, info.VideoContentType())
		assert.Equal(t, "", info.VideoMimeType)
		assert.Equal(t, "0s", info.Duration.String())
		assert.Equal(t, 0, info.Tracks)
		assert.Equal(t, 0, info.VideoWidth)
		assert.Equal(t, 0, info.VideoHeight)
		assert.Equal(t, 0, info.Frames)
		assert.Equal(t, 0.0, info.FPS)
		assert.Equal(t, false, info.Encrypted)
		assert.Equal(t, false, info.FastStart)
		assert.Equal(t, false, info.Compatible)
	})
	t.Run("image-isom-avc1.jpg", func(t *testing.T) {
		fileName := "testdata/image-isom-avc1.jpg"
		info, err := ProbeFile(fileName)
		require.NoError(t, err)
		require.NotNil(t, info)

		assert.Equal(t, fileName, info.FileName)
		assert.Equal(t, int64(31487), info.FileSize)
		assert.Equal(t, fs.ImageJpeg, info.FileType)
		assert.Equal(t, Mp4, info.VideoType)
		assert.Equal(t, int64(23209), info.VideoOffset)
		assert.Equal(t, int64(0), info.ThumbOffset)
		assert.Equal(t, media.Live, info.MediaType)
		assert.Equal(t, CodecAvc1, info.VideoCodec)
		assert.Equal(t, header.ContentTypeMp4, info.VideoMimeType)
		assert.Equal(t, header.ContentTypeMp4AvcMain, info.VideoContentType())
		assert.Equal(t, "1.024s", info.Duration.String())
		assert.InEpsilon(t, 1.024, info.Duration.Seconds(), 0.01)
		assert.Equal(t, 2, info.Tracks)
		assert.Equal(t, 320, info.VideoWidth)
		assert.Equal(t, 180, info.VideoHeight)
		assert.Equal(t, 31, info.Frames)
		assert.Equal(t, 30.0, info.FPS)
		assert.Equal(t, false, info.Encrypted)
		assert.Equal(t, false, info.FastStart)
		assert.Equal(t, true, info.Compatible)
	})
}

func TestProbe(t *testing.T) {
	t.Run("mp4v-avc1.mp4", func(t *testing.T) {
		f, fileErr := os.Open("testdata/mp4v-avc1.mp4")
		require.NoError(t, fileErr)
		defer f.Close()

		info, err := Probe(f)
		require.NoError(t, err)
		require.NotNil(t, info)

		assert.Equal(t, "", info.FileName)
		assert.Equal(t, int64(-1), info.FileSize)
		assert.Equal(t, fs.VideoMp4, info.FileType)
		assert.Equal(t, Mp4, info.VideoType)
		assert.Equal(t, int64(0), info.VideoOffset)
		assert.Equal(t, int64(-1), info.ThumbOffset)
		assert.Equal(t, media.Video, info.MediaType)
		assert.Equal(t, CodecAvc1, info.VideoCodec)
		assert.Equal(t, header.ContentTypeMp4, info.VideoMimeType)
		assert.Equal(t, header.ContentTypeMp4AvcMain, info.VideoContentType())
		assert.Equal(t, "810.0081ms", info.Duration.String())
		assert.InEpsilon(t, 0.81, info.Duration.Seconds(), 0.01)
		assert.Equal(t, 1, info.Tracks)
		assert.Equal(t, 640, info.VideoWidth)
		assert.Equal(t, 416, info.VideoHeight)
		assert.Equal(t, 24, info.Frames)
		assert.Equal(t, 30.0, info.FPS)
		assert.Equal(t, false, info.Encrypted)
		assert.Equal(t, true, info.FastStart)
		assert.Equal(t, true, info.Compatible)
	})
	t.Run("isom-avc1.mp4", func(t *testing.T) {
		f, fileErr := os.Open("testdata/isom-avc1.mp4")
		require.NoError(t, fileErr)
		defer f.Close()

		info, err := Probe(f)
		require.NoError(t, err)
		require.NotNil(t, info)

		assert.Equal(t, "", info.FileName)
		assert.Equal(t, int64(-1), info.FileSize)
		assert.Equal(t, fs.VideoMp4, info.FileType)
		assert.Equal(t, Mp4, info.VideoType)
		assert.Equal(t, int64(0), info.VideoOffset)
		assert.Equal(t, int64(-1), info.ThumbOffset)
		assert.Equal(t, media.Video, info.MediaType)
		assert.Equal(t, CodecAvc1, info.VideoCodec)
		assert.Equal(t, header.ContentTypeMp4, info.VideoMimeType)
		assert.Equal(t, header.ContentTypeMp4AvcMain, info.VideoContentType())
		assert.Equal(t, "1.024s", info.Duration.String())
		assert.InEpsilon(t, 1.024, info.Duration.Seconds(), 0.01)
		assert.Equal(t, 2, info.Tracks)
		assert.Equal(t, 320, info.VideoWidth)
		assert.Equal(t, 180, info.VideoHeight)
		assert.Equal(t, 31, info.Frames)
		assert.Equal(t, 30.0, info.FPS)
		assert.Equal(t, false, info.Encrypted)
		assert.Equal(t, false, info.FastStart)
		assert.Equal(t, true, info.Compatible)
	})
	t.Run("image-isom-avc1.jpg", func(t *testing.T) {
		f, fileErr := os.Open("testdata/image-isom-avc1.jpg")
		require.NoError(t, fileErr)
		defer f.Close()

		info, err := Probe(f)
		require.NoError(t, err)
		require.NotNil(t, info)

		assert.Equal(t, "", info.FileName)
		assert.Equal(t, int64(-1), info.FileSize)
		assert.Equal(t, fs.TypeUnknown, info.FileType)
		assert.Equal(t, Mp4, info.VideoType)
		assert.Equal(t, int64(23209), info.VideoOffset)
		assert.Equal(t, int64(0), info.ThumbOffset)
		assert.Equal(t, media.Live, info.MediaType)
		assert.Equal(t, CodecAvc1, info.VideoCodec)
		assert.Equal(t, header.ContentTypeMp4, info.VideoMimeType)
		assert.Equal(t, header.ContentTypeMp4AvcMain, info.VideoContentType())
		assert.Equal(t, "1.024s", info.Duration.String())
		assert.InEpsilon(t, 1.024, info.Duration.Seconds(), 0.01)
		assert.Equal(t, 2, info.Tracks)
		assert.Equal(t, 320, info.VideoWidth)
		assert.Equal(t, 180, info.VideoHeight)
		assert.Equal(t, 31, info.Frames)
		assert.Equal(t, 30.0, info.FPS)
		assert.Equal(t, false, info.Encrypted)
		assert.Equal(t, false, info.FastStart)
		assert.Equal(t, true, info.Compatible)
	})
}
