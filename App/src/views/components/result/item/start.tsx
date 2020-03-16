import * as React from 'react';
import { fontPx } from 'util/const';
import { View, Text } from 'native-base';
import * as Helpers from '../helpers';

interface Props {
    time: number;
}

export const OLStartTime: React.SFC<Props> = ({ time }) => (
    <View
        style={{
            flex: 1,
        }}
    >
        <Text style={{
            fontSize: fontPx(16),
        }}>
            {Helpers.startToReadable(time)}
        </Text>
    </View>
);