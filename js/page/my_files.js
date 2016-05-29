var myFilesRowMoreMenuStyle = {
  position: 'absolute',
  display: 'block',
  top: '26px',
  left: '-13px',
};
var MyFilesRowMoreMenu = React.createClass({
  onDeleteClicked: function() {
     var alertText = 'Are you sure you\'d like to remove "' + this.props.title + '?" This will ' +
                     (this.completed ? ' stop the download and ' : '') +
                     'permanently remove the file from your system.';

    if (confirm(alertText)) {
      lbry.deleteFile(this.props.lbryUri);
    }
  },
  render: function() {
    return (
      <div style={myFilesRowMoreMenuStyle}>
        <Menu {...this.props}>
          <MenuItem onClick={function() { alert('Make me work please!') }} label="Open in Finder" />
          <MenuItem onClick={function() { alert('Make me work please!') }} label="Remove from LBRY" />
          <MenuItem onClick={this.onDeleteClicked} label="Remove and delete file" />
        </Menu>
      </div>
    );
  }
});

var moreButtonColumnStyle = {
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
moreButtonContainerStyle = {
  display: 'block',
  position: 'relative',
},
moreButtonStyle = {
  fontSize: '1.3em',
},
progressBarStyle = {
  height: '15px',
  width: '230px',
  backgroundColor: '#444',
  border: '2px solid #eee',
  display: 'inline-block',
},
myFilesRowImgStyle = {
  maxHeight: '100px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
};
var MyFilesRow = React.createClass({
  onPauseResumeClicked: function() {
    if (this.props.stopped) {
      lbry.startFile(this.props.lbryUri);
    } else {
      lbry.stopFile(this.props.lbryUri);
    }
  },
  render: function() {
    var progressBarWidth = 230; // Move this somewhere better

    if (this.props.completed) {
      var pauseLink = null;
      var curProgressBarStyle = {display: 'none'};
    } else {
      var pauseLink = <Link icon={this.props.stopped ? 'icon-play' : 'icon-pause'}
                            label={this.props.stopped ? 'Resume download' : 'Pause download'}
                            onClick={() => { this.onPauseResumeClicked() }} />;

      var curProgressBarStyle = Object.assign({}, progressBarStyle);
      curProgressBarStyle.width = Math.floor(this.props.ratioLoaded * progressBarWidth) + 'px';
      curProgressBarStyle.borderRightWidth = progressBarWidth - Math.ceil(this.props.ratioLoaded * progressBarWidth) + 2;
    }

    if (this.props.showWatchButton) {
      var watchButton = <WatchLink streamName={this.props.lbryUri} />
    } else {
      var watchButton = null;
    }

    return (
      <div className="row-fluid">
        <div className="span3">
          <img src={this.props.imgUrl} alt={'Photo for ' + this.props.title} style={myFilesRowImgStyle} />
        </div>
        <div className="span6">
          <h2>{this.props.title}</h2>
          <div className={this.props.completed ? 'hidden' : ''} style={curProgressBarStyle}></div>
          { ' ' }
          {this.props.completed ? 'Download complete' : (parseInt(this.props.ratioLoaded * 100) + '%')}
          <div>{ pauseLink }</div>
          <div>{ watchButton }</div>
        </div>
        <div className="span1" style={moreButtonColumnStyle}>
          <div style={moreButtonContainerStyle}>
            <Link style={moreButtonStyle} ref="moreButton" icon="icon-ellipsis-h" title="More Options" />
            <MyFilesRowMoreMenu toggleButton={this.refs.moreButton} title={this.props.title}
                                lbryUri={this.props.lbryUri} />
          </div>
        </div>
      </div>
    );
  }
});

var MyFilesPage = React.createClass({
  getInitialState: function() {
    return {
      filesInfo: null,
    };
  },
  componentWillMount: function() {
    this.updateFilesInfo();
  },
  updateFilesInfo: function() {
    lbry.getFilesInfo((filesInfo) => {
      this.setState({
        filesInfo: (filesInfo ? filesInfo : []),
      });
      setTimeout(() => { this.updateFilesInfo() }, 1000);
    });
  },
  render: function() {
    if (this.state.filesInfo === null) {
      return null;
    }

    if (!this.state.filesInfo.length) {
      var content = <span>You haven't downloaded anything from LBRY yet. Go <Link href="/" label="search for your first download" />!</span>;
    } else {
      var content = [];
      for (let fileInfo of this.state.filesInfo) {
        let {completed, written_bytes, total_bytes, lbry_uri, file_name, stopped, metadata} = fileInfo;
        let {name, stream_name, thumbnail} = metadata;

        var title = (name || stream_name || ('lbry://' + lbry_uri));
        var ratioLoaded = written_bytes / total_bytes;
        var showWatchButton = (lbry.getMediaType(file_name) == 'video');

        content.push(<MyFilesRow lbryUri={lbry_uri} title={title} completed={completed} stopped={stopped}
                                 ratioLoaded={ratioLoaded} imgUrl={thumbnail}
                                 showWatchButton={showWatchButton}/>);
      }
    }
    return (
      <main className="page">
      <SubPageLogo />
      <h1>My files</h1>
      <section>
      {content}
      </section>
      <section>
        <Link href="/" label="<< Return" />
      </section>
      </main>
    );
  }
});