import React from "react";

import HoverMenu from "./HoverMenu";
import ControlMenu from './ControlMenu';

import { Editor } from 'slate-react';
import { initialValue } from './initial-value';
import { renderMark, renderNode } from "./renderers";
import { rules } from './rules';
import Html from 'slate-html-serializer';
const html = new Html({ rules })
export default class SlateEditor extends React.Component {
    // Set the initial value when the app is first constructed.
    state = {
        value: initialValue,
        isLoaded: false
    }

    componentDidMount() {
        this.updateMenu();
        this.setState({
            isLoaded: true
        })
    }

    componentDidUpdate = () => {
        this.updateMenu();
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        this.setState({ value })
    }

    updateMenu = () => {
        const menu = this.menu;
        if (!menu) return;

        const { value } = this.state;
        const { fragment, selection } = value;

        if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
            menu.removeAttribute('style')
            return
        }

        const native = window.getSelection();
        const range = native.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        menu.style.opacity = 1;
        menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

        menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
    }

    getWorkData() {
        const { value } = this.state;
        const titleBlock = value.document.getBlocks().get(0);
        const slugBlock = value.document.getBlocks().get(1);
        const linkBlock = value.document.getBlocks().get(2);
        const gitLinkBlock = value.document.getBlocks().get(3);
        const descBlock = value.document.getBlocks().get(4);

        const title = titleBlock && titleBlock.text ? titleBlock.text : 'No Title';
        const slug = slugBlock && slugBlock.text ? slugBlock.text : 'No Slug';
        const link = linkBlock && linkBlock.text ? linkBlock.text : 'No Link';
        const gitLink = gitLinkBlock && gitLinkBlock.text ? gitLinkBlock.text : 'No Git';
        const description = descBlock && descBlock.text ? descBlock.text : 'No Desc';

        return {
            title,
            slug,
            link,
            gitLink,
            description
        };
    }

    save() {
        // const { value } = this.state;
        const { save, isLoading } = this.props;
        const workValues = this.getWorkData();
        // const text = html.serialize(value);
        !isLoading && save(workValues);
    }

    // Render the editor.
    render() {
        const { isLoaded } = this.state;

        return (
          <React.Fragment>
            { 
                isLoaded && 
                <Editor {...this.props}
                    placeholder="Enter some text..."
                    value={this.state.value}
                    onChange={this.onChange}
                    renderMark={renderMark}
                    renderNode={renderNode}
                    renderEditor={this.renderEditor}
                />
            }
          </React.Fragment>
        );
    }

    renderEditor = (props, editor, next) => {
        const children = next();
        const { isLoading } = props;
        return (
            <React.Fragment>
            <ControlMenu isLoading={ isLoading } save={ () => this.save()} ></ControlMenu>
                {children}
                <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
            </React.Fragment>
        )
    }
}