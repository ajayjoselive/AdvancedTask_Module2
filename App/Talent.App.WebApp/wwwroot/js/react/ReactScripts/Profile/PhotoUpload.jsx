/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        const profilePhoto = props.profilePhoto ?
            Object.assign({}, props.profilePhoto)
            : "camera.jpg";

        const profilePhotoUrl = props.profilePhotoUrl ?
            Object.assign({}, props.profilePhotoUrl)
            : "";

        this.state = {

            image: "camera.jpg",
            showEditSection: false,
            imagecheck: "",
            val: "",
            fullUrl: "",
            newprofilePhoto: profilePhoto,
            newprofilePhotoUrl: profilePhotoUrl
        }
        this.closeEdit = this.closeEdit.bind(this)
        this.uploadpic = this.uploadpic.bind(this)
        this.uploadpicvalue = this.uploadpicvalue.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.handleClick = this.handleClick.bind(this)

    };

    handleClick(e) {

        this.refs.fileUploader.click();
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    uploadpicvalue(val) {

        this.setState({
            newprofilePhoto: val
        })

    }

    uploadpic() {

        const preview = document.querySelector('img');
        const file = this.state.newprofilePhoto;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imgElement = document.createElement("img");
            imgElement.src = reader.result;
            // console.log(reader.result)
            imgElement.onload = function (e) {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 100;
                const scaleSize = MAX_WIDTH / e.target.width;
                canvas.width = MAX_WIDTH;
                canvas.height = e.target.height * scaleSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
                const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
                preview.src = srcEncoded
                //console.log(srcEncoded)
            };

        }, false);

        if (file) {
            reader.readAsDataURL(file);

        }



        this.props.updateProfileData({ profilePhoto: this.state.newprofilePhoto.name, profilePhotoUrl: preview.src });
        this.props.saveProfileData({ profilePhoto: this.state.newprofilePhoto.name, profilePhotoUrl: preview.src });
        this.setState({
            showEditSection: false,
        })
    }

    onChangeFile(event) {

        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];

        var idxDot = file.name.lastIndexOf(".") + 1;
        var extFile = file.name.substr(idxDot, file.name.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            const preview = document.querySelector('img');
            const reader = new FileReader();
            this.state = {
                newprofilePhoto: file,
            };
            const val1 = this.state.newprofilePhoto;
            this.setState({
                showEditSection: true
            })
            reader.addEventListener("load", () => {
                preview.src = reader.result;

            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
            this.uploadpicvalue(val1);
        } else {
            TalentUtil.notification.show("Please select proper image.", "error", null, null)
            return false
        }


    }

    render() {
        return (
            this.state.showEditSection ? this.renderselect() : this.renderdisplay()
        )
    }

    renderselect() {



        const path = this.state.profilePhotoUrl === "" ? "../images/camera.png" : this.state.profilePhotoUrl === null ? "../images/camera.png" : this.state.profilePhotoUrl;

        const newprofilePhoto = this.state.newprofilePhoto;

        this.state = {
            fullUrl: path,
            newprofilePhoto: newprofilePhoto
        }

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <div className="add-media">
                        <React.Fragment>
                            <img src={this.state.fullUrl}
                                title="Please upload your profile photo." id="profile-image-preview"
                                alt="Thumbnail Photo" className="image--cover" />
                            <br />
                            <button type="button" className="ui teal button" onClick={this.uploadpic}>Upload</button>

                        </React.Fragment>
                    </div>
                </div>
            </div>
        );
    }


    renderdisplay() {


        const path = this.props.profilePhotoUrl === "" ? "../images/camera.png" : this.props.profilePhotoUrl === null ? "../images/camera.png" : this.props.profilePhotoUrl;


        const newprofilePhoto = this.state.newprofilePhoto;
        this.state = {
            fullUrl: path,
            newprofilePhoto: newprofilePhoto
        }

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <div className="add-media" onClick={this.handleClick}>
                        <React.Fragment>
                            <img src={this.state.fullUrl}
                                title="Please upload your profile photo." id="profile-image-preview"
                                alt="Thumbnail Photo" className="image--cover" />
                            <input type="file" id="file" ref="fileUploader" style={{ display: "none" }}
                                onChange={this.onChangeFile} />
                        </React.Fragment>
                    </div>
                </div>
            </div>
        );
    }
}