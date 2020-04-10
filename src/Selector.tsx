import React, { ChangeEvent } from 'react';
type HtmlEvent = React.ChangeEvent<HTMLSelectElement>
export interface SelectorProps {
    list: string[],
    onChange: React.EventHandler<HtmlEvent>
};

class Selector extends React.Component<SelectorProps, {}> {
    public render() {
        const { list, onChange } = this.props;
        return (
            <select onChange={onChange} defaultValue=''>
                {
                    list.map((ele, index) => (<option key={`${ele}-${index}`} value={ele}>{ele}</option>)).concat([(<option key={'default'} value=''>---</option>)])
                }
            </select>
        );
    }
}

export default Selector;