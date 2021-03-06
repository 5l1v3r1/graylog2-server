/**
 * This file is part of Graylog.
 *
 * Graylog is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Graylog is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Graylog.  If not, see <http://www.gnu.org/licenses/>.
 */
package org.graylog.plugins.views.search.views.widgets.aggregation;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.auto.value.AutoValue;
import org.graylog.autovalue.WithBeanGetter;

@AutoValue
@JsonDeserialize(builder = SeriesDTO.Builder.class)
@WithBeanGetter
public abstract class SeriesDTO {
    private static final String FIELD_CONFIG = "config";
    private static final String FIELD_FUNCTION = "function";

    @JsonProperty(FIELD_CONFIG)
    public abstract SeriesConfigDTO config();

    @JsonProperty(FIELD_FUNCTION)
    public abstract String function();

    @AutoValue.Builder
    public static abstract class Builder {
        @JsonProperty(FIELD_CONFIG)
        public abstract Builder config(SeriesConfigDTO config);

        @JsonProperty(FIELD_FUNCTION)
        public abstract Builder function(String function);

        public abstract SeriesDTO build();

        @JsonCreator
        public static Builder create() {
            return new AutoValue_SeriesDTO.Builder()
                    .config(SeriesConfigDTO.empty());
        }

        @JsonCreator
        public static Builder createFromString(String function) {
            return create().function(function).config(SeriesConfigDTO.empty());
        }
    }
}
