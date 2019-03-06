import Sequelize from 'sequelize';
import { faculty, } from 'models/common/utils/connect.js';
import publicationCategoryUtils from 'models/faculty/utils/publication-category.js';

const Publication = faculty.define( 'publication', {
    publicationId: {
        type:          Sequelize.INTEGER.UNSIGNED,
        allowNull:     false,
        primaryKey:    true,
        autoIncrement: true,
    },
    profileId: {
        type:       Sequelize.INTEGER.UNSIGNED,
        allowNull:  false,
    },
    issueYear: {
        type:      Sequelize.SMALLINT.UNSIGNED,
        allowNull: true,
    },
    category: {
        type:         Sequelize.TINYINT.UNSIGNED,
        allowNull:    false,
        defaultValue: publicationCategoryUtils.defaultId,
    },
    international: {
        type:      Sequelize.BOOLEAN,
        allowNull: false,
    },
    refereed: {
        type:      Sequelize.BOOLEAN,
        allowNull: false,
    },
    issueMonth: {
        type:      Sequelize.TINYINT.UNSIGNED,
        allowNull: true,
    },
} );

export default Publication;
