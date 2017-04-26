import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Icon, H1, Card, CardItem, Body, Header, Left, Right, Title } from 'native-base';

import api from './service/api';

class DetailPost extends Component {

    constructor(props) {
        super(props);
         const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            postDetails: {},
            postComments: ds,
            showComments: false,
            showLoader: false,
        }
    }

    /* Rendering initial posts  */
    componentDidMount() {
        api.getDetailPost(this.props.post).then((res) => {
            res.title = res.title.replace(/\n/g, ' ');
            res.body = res.body.replace(/\n/g, ' ');
            this.setState({
                postDetails: res
            })
        });
    }

    // Calling comment API 
    getPostComments() {
        if (this.state.showComments == false) {
            this.setState({
                showLoader: true
            })
            api.getCommentsPost(this.props.post).then((res) => {
                console.log(res);
                this.setState({
                    postComments: this.state.postComments.cloneWithRows(res),
                    showComments: true,
                    showLoader: false
                })

            });
        }
        else {
            return false;
        }
    }

    // looping through array of comments list and binding it in the view.
    renderRow(post) {
            post.name = post.name.replace(/\n/g, ' ');
            post.body = post.body.replace(/\n/g, ' ');
            return (
                <Card>
                    <CardItem>
                        <Body>
                            <Text><Text style={styles.titleContent}>Name : </Text><Text style={styles.detailContent}>{post.name}</Text></Text>
                            <Text><Text style={styles.titleContent}>E-Mail Id : </Text><Text style={styles.detailContent}>{post.email}</Text></Text>
                            <Text><Text style={styles.titleContent}>Message : </Text><Text style={styles.detailContent}>{post.body}</Text></Text>
                        </Body>
                    </CardItem>
                </Card>
            );
    }

    // Navigating components

    navigate(routeName) {
        this.props.navigator.push({
            name: routeName
        })
    }


    // Binding post detail in the view.
    // Clicking the comments button will display Post Comments.
    render() {
        return (
            <Container style={{ backgroundColor: 'rgb(63,81,181)'}}>
                <Header>
                    <Left>
                        <Button transparent onPress={this.navigate.bind(this, 'viewPost')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>POST DETAIL</Title>
                    </Body>
                </Header>
                <Content>
                    {this.state.postDetails!= {} ?
                        <Card>
                                <CardItem>
                                    <Body>
                                        <Text><Text style={styles.titleContent}>User Id : </Text><Text style={styles.detailContent}>{this.state.postDetails.userId}</Text></Text>
                                        <Text><Text style={styles.titleContent}>Id : </Text><Text style={styles.detailContent}>{this.state.postDetails.id}</Text></Text>
                                        <Text><Text style={styles.titleContent}>Title : </Text><Text style={styles.detailContent}>{this.state.postDetails.title}</Text></Text>
                                        <Text><Text style={styles.titleContent}>Body : </Text><Text style={styles.detailContent}>{this.state.postDetails.body}</Text></Text>
                                    </Body>
                                </CardItem>
                            <CardItem header style={{ alignSelf: 'flex-end' }}>
                                <Button transparent onPress={this.getPostComments.bind(this)}>
                                    <Icon active name="chatbubbles" />
                                    <Text style={{ fontSize: 15, color: 'rgb(63,81,181)' }}>Comments</Text>
                                </Button>
                            </CardItem>
                        </Card>
                        :null}
                        </Content>
                          <Content>
                               {this.state.showLoader ? <ActivityIndicator color='white' animating={this.state.animating} size='large' /> : null}
                        {this.state.showComments ? 
                      <ListView
          dataSource={this.state.postComments}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
                        : null}
                </Content>
            </Container>
        );
    }
}

/*                 STYLE                            */

var styles = StyleSheet.create({
    titleContent: {
        fontSize: 20,
        color: 'rgb(63,81,181)',
        fontWeight: 'bold'
    },
    detailContent: {
        fontSize: 20,
        color: 'black'
    },
});


export default DetailPost