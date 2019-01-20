import * as React from 'react';
import { ScrollView, RefreshControl, TextStyle } from 'react-native';
import {
    View,
    Spinner,
    Text,
    Body,
    CardItem,
    Card,
    Title,
} from 'native-base';
import { getPasses } from '../../../lib/api';
import { UNIT, COLORS } from '../../../util/const';
import Lang from '../../../lib/lang';

interface State {
    passings: Passing[];
    loading: boolean;
}

const TEXT_STYLE: TextStyle = {
    fontSize: UNIT,
    paddingVertical: UNIT / 2,
};

export class OLPassings extends React.PureComponent<any, State> {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: {
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#e86a1e',
        },
        headerTintColor: 'white',
    })

    state = {
        passings: null,
        loading: false,
    };

    componentDidMount() {
        this.getPasses();
    }

    getPasses = async () => {
        const { params: { id } } = this.props.navigation.state;
        const passings = await getPasses(id);
        this.setState({ passings });
    }

    renderResult = (passing: Passing) => {
        return (
            <Card key={passing.time + passing.runnerName}>
                <CardItem>
                    <Body
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <View>
                            <Text
                                style={TEXT_STYLE}
                            >
                                {Lang.print('competitions.passings.class')}:
                            </Text>
                            <Text
                                style={TEXT_STYLE}
                            >
                                {Lang.print('competitions.passings.name')}:
                            </Text>
                            <Text
                                style={TEXT_STYLE}
                            >
                                {Lang.print('competitions.passings.passTime')}:
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                paddingLeft: UNIT,
                            }}
                        >
                            <Text
                                style={TEXT_STYLE}
                            >
                                {passing.class}
                            </Text>
                            <Text
                                style={TEXT_STYLE}
                            >
                                {passing.runnerName}
                            </Text>
                            <Text
                                style={TEXT_STYLE}
                            >
                                {passing.passtime}
                            </Text>
                        </View>
                    </Body>
                </CardItem>
            </Card>
        );
    }

    refresh = async () => {
        this.setState({ loading: true });
        await this.getPasses();
        this.setState({ loading: false });
    }

    renderInner = () => {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={this.refresh}
                        refreshing={this.state.loading}
                        colors={[COLORS.MAIN]}
                        tintColor={COLORS.MAIN}
                    />
                }
                style={{ padding: UNIT }}
            >
                <Title style={{
                    textAlign: 'left',
                    fontSize: UNIT * 1.35,
                    marginVertical: 10,
                }}>
                    {Lang.print('competitions.passings.title')}
                </Title>

                {this.state.passings.map(this.renderResult)}

                <Text style={{
                    ...TEXT_STYLE,
                    textAlign: 'center',
                }}>
                    {Lang.print('competitions.passings.info')}
                </Text>
            </ScrollView>
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                {
                    this.state.passings
                    ? this.renderInner()
                    : <Spinner color={COLORS.MAIN} />
                }
            </View>
        );
    }
}
