import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';

class App extends Component {
	constructor(props) {
        super(props);
        
		this.state = {
            mode: 'welcome',
            selected_content_id: 0,
			welcome: {title: 'Welcome', desc: 'Hello, React!'},
			subject: {title: 'WEB', sub: 'World Wide Web!'},
			contents: [
				{id: 1, title: 'HTML', desc: 'HTML is for information'},
				{id: 2, title: 'CSS', desc: 'CSS is for information'},
				{id: 3, title: 'JavaScript', desc: 'JavaScript is for information'}
			]
        }
        this.max_content_id = this.state.contents.length;
	}

    getReadContent(){
        var i = 0;
        while(i < this.state.contents.length) {
            var data = this.state.contents[i];
            if(data.id === this.state.selected_content_id) return data;
            i++;
        }
    }

    getContent(){
        var _title, _desc, _article, _content, _contents = null;
        if(this.state.mode === 'welcome'){
            _title = this.state.welcome.title;
            _desc = this.state.welcome.desc;
            _article = <ReadContent title={_title} desc={_desc} />
        } else if(this.state.mode === 'read') {
            _content=this.getReadContent();
            _article = <ReadContent title={_content.title} desc={_content.desc} />
        } else if(this.state.mode === 'create') {
            _article = <CreateContent 
                onSubmit={
                    function(create_title, create_desc){
                        this.max_content_id++;
                        _contents = this.state.contents.concat(
                            {
                                id: this.max_content_id, 
                                title: create_title, 
                                desc: create_desc
                            }
                        )
                        this.setState({
                            mode: 'read',
                            selected_content_id: this.max_content_id,
                            contents: _contents
                        })
                    }.bind(this)
                }
            />
        } else if(this.state.mode === 'update') {
            _content = this.getReadContent();
            _article = <UpdateContent
                data={_content}
                onSubmit={
                    function(update_id, update_title, update_desc) {
                        _contents = Array.from(this.state.contents);
                        var i = 0;
                        while(i < _contents.length){
                            if(_contents[i].id === update_id){
                                _contents[i] = {
                                    id: update_id, 
                                    title: update_title, 
                                    desc: update_desc
                                }
                                break;
                            }
                            i++;
                        }
                        this.setState({
                            mode: 'read',
                            selected_content_id: update_id,
                            contents: _contents
                        })
                    }.bind(this)
                }
            />
        } else if(this.state.mode === 'delete') {

        }

        return _article;
    };

	render() {      
		return (
			<div className="App">
                <Subject 
                    title={this.state.subject.title} 
                    sub={this.state.subject.sub} 
                    onChangePage={
                        function(){
                            this.setState({
                                mode: 'welcome'
                            });
                        }.bind(this)
                    }
                />

                <TOC 
                    data={this.state.contents} 
                    onChangePage={
                        function(id){
                            this.setState({
                                mode: 'read',
                                selected_content_id: Number(id)
                            });
                        }.bind(this)
                    }    
                />

                <Control 
                    onChangeMode={
                        function(_mode){
                            if(_mode === 'delete'){
                                var new_contents = Array.from(this.state.contents);
                                var i = 0;
                                while(i < new_contents.length){
                                    if(new_contents[i].id === this.state.selected_content_id){
                                        new_contents.splice(i,1);
                                        break;
                                    }
                                    i++;
                                }
                                this.setState({
                                    mode:'welcome',
                                    contents: new_contents
                                });
                                alert('deleted');
                            }
                            else {
                                this.setState({
                                    mode: _mode
                                });
                            }
                        }.bind(this)
                    }
                />
                
				{this.getContent()}
			</div>
		);
	}
}

export default App;