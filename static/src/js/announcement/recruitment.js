import SingleDefaultTagFilter from 'static/src/js/components/announcement/single-default-tag-filter.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import { GetHeaderMin, GetHeaderSmall, GetHeaderMedium, GetHeaderLarge, } from 'static/src/js/components/common/header.js';

window.addEventListener( 'load', () => {
    const headerMin = new GetHeaderMin( {
        headerDOM:     document.querySelector( '.body__header.header.header--min' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerSmall = new GetHeaderSmall( {
        headerDOM:     document.querySelector( '.body__header.header.header--small' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerMedium = new GetHeaderMedium( {
        headerDOM:     document.querySelector( '.body__header.header.header--medium' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );
    const headerLarge = new GetHeaderLarge( {
        headerDOM:     document.querySelector( '.body__header.header.header--large' ),
        allHeaderDOMs: document.querySelectorAll( '.body__header.header' ),
    } );

    const filter = new SingleDefaultTagFilter( {
        defaultTag:            [ 'recruitment', ],
        supportedTag:          [],
        filterDOM:             document.getElementById( 'filter' ),
        announcementPinnedDOM: document.getElementById( 'announcement--pinned' ),
        announcementNormalDOM: document.getElementById( 'announcement--normal' ),
        pagesDOM:              document.getElementById( 'pages' ),
        scrollTopDOM:          document.getElementById( 'announcement--normal' ),
        amount:                6,
        from:                  new Date( '2019/01/01' ),
        to:                    new Date( Date.now() ),
        page:                  1,
        visiblePageNum:        2,
        currentLanguageId:     WebLanguageUtils.currentLanguageId,
    } );
    filter.getAll();
} );
