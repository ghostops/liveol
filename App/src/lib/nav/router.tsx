import * as React from 'react';
import { COLORS, px } from 'util/const';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Lang } from 'lib/lang';
import { Mappings } from './mappings';
import { NavigationContainer, TypedNavigator, ParamListBase } from '@react-navigation/native';
import { Right, Left } from 'views/scenes/home/header';
import { Routes } from './routes';
import { ScreenOrientation } from 'expo';
import { xtraSpace, hasNotch } from 'util/hasNotch';

interface StateProps {
    landscape: boolean;
}

const Stack = createStackNavigator();

const Component: React.SFC<StateProps> = ({ landscape }) => {
    return (
        <NavigationContainer
            theme={{
                colors: {
                    text: 'white',
                    background: 'white',
                    border: 'white',
                    card: COLORS.MAIN,
                    primary: 'white',
                },
                dark: false,
            }}
        >
            <Stack.Navigator
                initialRouteName={Routes.home}
                screenOptions={{
                    headerBackTitle: Lang.print('back'),
                    headerBackTitleStyle: {
                        color: 'white',
                    },
                    headerTitleContainerStyle: {
                        width: '65%',
                        alignItems: 'center',
                    },
                    headerStatusBarHeight: px(20) + (hasNotch && !landscape ? xtraSpace : 0),
                }}
            >
                <Stack.Screen
                    name={Routes.home}
                    component={Mappings[Routes.home]}
                    options={(props) => ({
                        title: Lang.print('home.title'),
                        headerLeft: () => <Left />,
                        headerRight: () =>
                            <Right onPress={() => props.navigation.navigate(Routes.info)} />,
                    })}
                />

                <Stack.Screen
                    name={Routes.competition}
                    component={Mappings[Routes.competition]}
                    options={(props) => ({
                        title: props.route.params['title'],
                    })}
                />

                <Stack.Screen
                    name={Routes.info}
                    component={Mappings[Routes.info]}
                    options={(props) => ({
                        title: Lang.print('info.title'),
                    })}
                />

                <Stack.Screen
                    name={Routes.passings}
                    component={Mappings[Routes.passings]}
                    options={(props) => ({
                        title: props.route.params['title'],
                    })}
                />

                <Stack.Screen
                    name={Routes.results}
                    component={Mappings[Routes.results]}
                    options={(props) => ({
                        title: `${Lang.print('classes.resultsFor')}: ${props.route.params['className']}`,
                    })}

                    initialParams={{
                        id: 16011,
                        className: 'M20-1',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    landscape: state.general.rotation === ScreenOrientation.Orientation.LANDSCAPE,
});

export default connect(mapStateToProps, null)(Component);
