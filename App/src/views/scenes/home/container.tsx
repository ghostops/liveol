import * as React from 'react';
import { ALL_COMPETITIONS } from 'lib/graphql/queries/competitions';
import { AllCompetitions } from 'lib/graphql/queries/types/AllCompetitions';
import { Competition } from 'lib/graphql/fragments/types/Competition';
import { connect } from 'react-redux';
import { Lang } from 'lib/lang';
import { NavigationProp } from '@react-navigation/native';
import { OLError } from 'views/components/error';
import { OLHome as Component } from './component';
import { Right, Left } from './header';
import { Routes } from 'lib/nav/routes';
import { today } from 'util/date';
import { useQuery } from '@apollo/react-hooks';
import * as _ from 'lodash';
import * as Actions from './store';

interface OwnProps {
    navigation: NavigationProp<any, any>;
}

interface StateProps {
    searchResults: Competition[] | null;
    searching: boolean;
}

interface DispatchProps {
    setSearching: (value: boolean) => void;
    getCompetition: (id: number) => void;
}

type Props = StateProps & OwnProps & DispatchProps;

const DataWrapper: React.SFC<Props> = (props) => {
    React.useEffect(
        () => {
            props.navigation.setOptions({
                title: Lang.print('home.title'),
                headerLeft: Left,
                headerRight: () => <Right onPress={() => props.navigation.navigate(Routes.info)} />,
            });
        },
        [],
    );

    const { data, loading, error } = useQuery<AllCompetitions>(ALL_COMPETITIONS);

    if (error) return <OLError error={error} />;

    const competitions: Competition[] = _.get(data, 'competitions.getAllCompetitions', null);

    return (
        <Component
            loading={loading}
            competitions={props.searchResults || competitions}
            todaysCompetitions={(
                (competitions || [])
                    .filter((comp) => today() === comp.date)
            )}
            onCompetitionPress={(competition) => {
                props.navigation.navigate(Routes.competition, {
                    id: competition.id,
                    title: competition.name,
                });
            }}
            openSearch={() => props.setSearching(true)}
            searching={props.searching}
        />
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    searchResults: state.home.visibleCompetitions,
    searching: state.home.searching,
});

const mapDispatchToProps = {
    setSearching: Actions.setSearching,
};

export const OLHome = connect(mapStateToProps, mapDispatchToProps)(DataWrapper);
