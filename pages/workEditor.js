import React from 'react';

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from '../components/BasePage';
import SlateEditor from '../components/slate-editor/Editor';
import withAuth from "../components/hoc/withAuth";

class WorkEditor extends React.Component {

    render() {
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="work-editor-page" title="Add Another Work..">
                    <SlateEditor />
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(WorkEditor);