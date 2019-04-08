import React from 'react';

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from '../components/BasePage';
import SlateEditor from '../components/slate-editor/Editor';
import withAuth from "../components/hoc/withAuth";

import { createWork } from "../actions";

class WorkEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isSaving: false
        };

        this.saveWork = this.saveWork.bind(this);
    }

    saveWork(data) {
        const work = {};
        work = data;
        // work.title = data.title;
        // work.slug = data.slug;
        // work.link = data.link;
        // work.gitLink = data.gitLink;
        // work.description = data.description;
        this.setState({
            isSaving: true
        })

        createWork(work)
        .then(createdWork => {
            this.setState({
                isSaving: false
            });
            console.log(createdWork);
        })
        .catch(err => {
            this.setState({
                isSaving: false
            });
            const message = err.message || 'Server Error!';
            console.error(message);
        })
    }

    render() {
        const { isSaving } = this.state;
        return (
            <BaseLayout {...this.props.auth}>
                <BasePage containerClass="editor-wrapper" className="work-editor-page">
                    <SlateEditor isLoading={ isSaving } save={this.saveWork} />
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth('siteOwner')(WorkEditor);