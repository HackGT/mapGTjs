**UPDATES** *new map format*

```xml
<svg>
    <g class="map">
        <g class="view">
            <g class="area">
            </g>
        </g>
        <g class="view">
            <g class="area">
            </g>
        </g>
    </g>
</svg>
```



| Class  | Description                                                  |
| ------ | ------------------------------------------------------------ |
| `map`  | The group in the SVG that wraps the map.  Maps are made up of multiple views |
| `view` | Viewable regions within a map                                |
| `area` | An area within a view                                        |



------

**Old format**

*some components of this format can be re-used if the editor will be used for making maps*

To use this package, you need to have an SVG that satisfies the following format:

```xml
<svg>
    <g class="map">
        <path class="outer-border">
        </path>
        <g class="inner-border">
            <path>
            </path>
        </g>
        <g class="areas">
            <g class="area">
                <g class="icons serialized">
                </g>
            </g>
            <g class="area">
                <g class="icons serialized">
                </g>
            </g>
            <g class="icons">
            </g>
        </g>
    </g>
</svg>
```

| Class          | Description                                   |
| -------------- | --------------------------------------------- |
| `map`          | The group in the SVG that wraps the map       |
| `outer-border` | The outer border of the map                   |
| `inner-border` | The inner borders of the map                  |
| `areas`        | The areas (for example, rooms) within the map |
| `area`         | A specific area in the map                    |
| `icons`        | The icons on the map                          |
| `serialized`   | Marker for items that are serialized          |

`outer-border`

- Must contain ONLY ONE closed path
- May contain one or more other groups with relevant classes

`inner-border`

- Must contain ONE OR MORE paths which may or may not be closed
- Must NOT contain any other groups

`areas`

- Must contain ONE OR MORE groups having the class area
- Must NOT contain any other groups

`area`

- Must contain ONE closed path having a unique id
- May contain one or more other groups with relevant classes
