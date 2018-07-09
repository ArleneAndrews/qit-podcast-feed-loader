import React from 'react'
import { actions } from 'mirrorx'

import PodcastReleaseDate from './Episode/PodcastReleaseDate'
import RemoveFromPlaylistButton from './Episode/RemoveFromPlaylistButton'
import PlayNextButton from './Episode/playNextButton'
import styled from 'styled-components'
import SortableList from './SortableList'
import DragNDropIndicator from './Episode/DragNDropIndicator'

import {
  StyledEpisode,
  StyledEpisodeTitle,
  StyledPodcastTitle,
  StyledEpisodeBody,
  StyledControls
} from './Episode/Styled'

export const Queue = ({ playlist, nowPlaying, className }) => (
  <div className={className}>
    {playlist.length === 0 ? null : 'Next in queue:'}
    {playlist.length === 0 ? (
      `Your queue is empty. Try a search like "pwa" to learn more about the technology behind this app!`
    ) : (
      <SortableList
        useWindowAsScrollContainer
        useDragHandle
        onSortEnd={({ oldIndex, newIndex }) =>
          actions.player.resortPlaylist({ oldIndex, newIndex })
        }
        items={playlist.map(episode => (
          <StyledEpisode
            onClick={() => actions.player.play(episode)}
            key={episode.id}
            playing={episode.audioUrl === nowPlaying.audioUrl}
            data-item-type='playlist'
          >
            <StyledEpisodeTitle>{episode.episodeTitle}</StyledEpisodeTitle>

            <StyledEpisodeBody>
              <StyledPodcastTitle>
                {episode.podcastTitle}&nbsp;
                <PodcastReleaseDate releaseDate={episode.published} />
              </StyledPodcastTitle>

              <StyledControls>
                {playlist[0].audioUrl !== episode.audioUrl && (
                  <PlayNextButton
                    onClick={event => {
                      event.stopPropagation()
                      actions.player.playNext(episode)
                    }}
                  />
                )}

                <RemoveFromPlaylistButton
                  lonely={playlist.length === 1}
                  onClick={event => {
                    event.stopPropagation()
                    actions.player.removeFromPlaylist(episode)
                  }}
                />
                {playlist.length > 1 && <DragNDropIndicator />}
              </StyledControls>
            </StyledEpisodeBody>
          </StyledEpisode>
        ))}
      />
    )}
  </div>
)

export default styled(Queue)`
  ${props => props.blur && 'filter: blur(5px);'};
`
