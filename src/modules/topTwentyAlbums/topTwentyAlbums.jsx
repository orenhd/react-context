import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { AppModulesEnum } from '../../shared/enums';

import { connectAppModules } from '../../application/application.provider';
import { TopTwentyAlbumsModuleType } from './topTwentyAlbums.provider';

import GenreSelectionBar from './components/genreSelectionBar';
import AlbumsList from './components/albumsList';

class TopTwentyAlbums extends PureComponent {

    /* Lifecycle Methods */
    componentDidMount() {
        const genreId = parseInt(this.props.match.params.genreId, 10);
        this.props.topTwentyAlbums.loadGenres(genreId);
    }

    componentDidUpdate(prevProps) {
        /* if route param has changed - store the new viewedLocationId */
        if (this.props.match.params.genreId !== prevProps.match.params.genreId) {
            const genreId = parseInt(this.props.match.params.genreId, 10);
            this.props.topTwentyAlbums.loadAlbumEntriesByGenreId(genreId);
        }
    }

    /* Class Methods */

    navigateToSelectedGenreId = (genreId) => {
        this.props.history.push(`/top-twenty/${genreId}`);
    }

    render() {
        const { currentGenre, sortedGenres, albumEntriesList} = this.props.topTwentyAlbums;

        return <div className="top-twenty-albums">
            <GenreSelectionBar 
                genres={sortedGenres} 
                currentGenre={currentGenre}
                genreSelectedHandler={this.navigateToSelectedGenreId}
            />
            <AlbumsList
                albumEntriesList={albumEntriesList}
            />
        </div>
    }
}

TopTwentyAlbums.propTypes = {
    topTwentyAlbums: TopTwentyAlbumsModuleType
}

const mapAppModulesToProps = {
    topTwentyAlbums: AppModulesEnum.topTwentyAlbums,
}

// example for using connection method I - connectAppModules
export default withRouter(connectAppModules(mapAppModulesToProps)(TopTwentyAlbums));