/*
Package duf provides file system usage information.

Copyright (c) 2018 - 2025 PhotoPrism UG. All rights reserved.

	This program is free software: you can redistribute it and/or modify
	it under Version 3 of the GNU Affero General Public License (the "AGPL"):
	<https://docs.photoprism.app/license/agpl>

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	The AGPL is supplemented by our Trademark and Brand Guidelines,
	which describe how our Brand Assets may be used:
	<https://www.photoprism.app/trademark>

This code is copied and modified in part from:

  - https://github.com/muesli/duf
    MIT License, Copyright (c) 2020 Christian Muehlhaeuser
    see https://github.com/muesli/duf?tab=License-1-ov-file#readme

  - https://github.com/shirou/gopsutil
    BSD License, Copyright (c) 2014, WAKAYAMA Shirou
    see https://github.com/shirou/gopsutil?tab=License-1-ov-file#readme

Feel free to send an email to hello@photoprism.app if you have questions,
want to support our work, or just want to say hello.

Additional information can be found in our Developer Guide:
<https://docs.photoprism.app/developer-guide/>
*/
package duf

// Mounts returns the active file system mounts, along with any warnings or errors that have occurred.
func Mounts() (m []Mount, warnings []string, err error) {
	return mounts()
}
