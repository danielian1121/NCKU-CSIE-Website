import { classAdd, classRemove, } from 'static/src/js/utils/class-name.js';
import DefaultTagFilter from 'static/src/js/components/announcement/default-tag-filter.js';
import ValidateUtils from 'models/common/utils/validate.js';

export default class SingleDefaultTagFilter extends DefaultTagFilter {
    subscribeTimeEvent () {
        [
            'from',
            'to',
        ].forEach( ( timeFilter ) => {
            [
                'year',
                'month',
                'date',
            ].forEach( ( timePart ) => {
                this.DOM.filter[ timeFilter ][ timePart ].addEventListener( 'change', () => {
                    try {
                        const year  = this.DOM.filter[ timeFilter ].year.value;
                        const month = this.DOM.filter[ timeFilter ].month.value;
                        const date  = this.DOM.filter[ timeFilter ].date.value;
                        this.state.page = this.config.page;
                        this.state[ timeFilter ] = new Date( `${ year }/${ month }/${ date }` );

                        if ( !ValidateUtils.isValidDate( this.state[ timeFilter ] ) ) {
                            this.DOM.announcement.pinned.briefings.innerHTML = '';
                            classAdd( this.DOM.announcement.pinned.loading, 'loading--hidden' );
                            classRemove( this.DOM.announcement.pinned.noResult, 'no-result--hidden' );
                            this.DOM.announcement.normal.briefings.innerHTML = '';
                            classAdd( this.DOM.announcement.normal.loading, 'loading--hidden' );
                            classRemove( this.DOM.announcement.normal.noResult, 'no-result--hidden' );
                            throw new TypeError( 'invalid arguments' );
                        }

                        if ( this.state.selectDefault ) {
                            this.state.tagParam = this.tagId.default;
                            this.getAll();
                            this.pushState();
                        }
                        else {
                            this.state.tagParam = this.tagId.default.concat( this.state.tags );
                            this.getAll();
                            this.pushState();
                        }
                    }
                    catch ( err ) {
                        console.error( err );
                    }
                } );
            } );
        } );
    }

    subscribeTagEvent () {
        this.DOM.filter.tags.forEach( ( tagObj ) => {
            /**
             * Default tag event subscribe.
             */

            if ( tagObj.id === this.tagId.default[ 0 ] ) {
                /**
                 * Default tag should be always active.
                 */

                classAdd( tagObj.node, 'tags__tag--active' );
                tagObj.node.addEventListener( 'click', () => {
                    this.DOM.filter.tags.forEach( ( tagObj ) => {
                        classRemove( tagObj.node, 'tags__tag--active' );
                    } );

                    classAdd( tagObj.node, 'tags__tag--active' );

                    this.state.selectDefault = true;
                    this.state.tags = [ tagObj.id, ];
                    this.state.page = this.config.page;
                    this.state.tagParam = this.tagId.default;

                    this.getAll();
                    this.pushState();
                } );
            }
            else {
                tagObj.node.addEventListener( 'click', () => {
                    const index = this.state.tags.indexOf( tagObj.id );
                    if ( index >= 0 ) {
                        this.state.tags.splice( index, 1 );
                        classRemove( tagObj.node, 'tags__tag--active' );
                    }
                    else {
                        this.state.tags.push( tagObj.id );
                        classAdd( tagObj.node, 'tags__tag--active' );
                    }

                    this.state.selectDefault = false;
                    this.state.page = this.config.page;
                    this.state.tagParam = this.tagId.default.concat( this.state.tags );

                    this.getAll();
                    this.pushState();
                } );
            }
        } );
    }
}
