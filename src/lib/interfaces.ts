export type TCategory = 'fantasy' | 'sci-fi' | 'boardgame'
export type TSubCategory = 'boardgame' | 'dungeons-and-dragons' | 'general-fantasy' | 'pathfinder' | 'sci-fi'
export type TEndPoint =
  | 'element_ids_by_query'
  | 'moods'
  | 'subcategories'
  | 'playlists'
  | 'categories'
  | 'elements'
  | 'samples'
  | 'moodelements'
  | 'reverb-presets'
  | 'global-elements'
  | 'sample_ids_by_query'
  | 'state'
  | 'soundsets'

export interface ISoundSet {
  approve_soundset_as_community_content_url: string
  artwork_url: string
  category: TCategory
  dismiss_rejection_url: string
  duplicate_url: string
  full_name: string
  id: number
  initial_gain: number
  is_bundled: boolean
  is_featured: boolean
  is_private: boolean
  is_rejected: boolean
  name: string
  online_player_artwork_url: string
  online_player_background_url: string
  owned_by: number
  reject_soundset_url: string
  rejected_reason: string
  report_playing_elements_user_can_save_url: string
  retract_from_publishing_approval_url: string
  reverb_preset: null
  slug: string
  snapshot_error: string
  snapshot_status: string
  status: string
  subcategory: TSubCategory
  submit_for_publishing_approval_url: string
  sync_reverb_preset_url: string
  unity_id: string
  url: string
  user_can_clean_edit_soundset: boolean
  user_can_copy_elements_from_other_soundsets: boolean
  user_can_delete_soundset: boolean
  user_can_edit_soundset: boolean
  user_can_publish_or_retract_soundset: boolean
  user_is_owner_of_soundset: boolean
  uuid: string
}

export interface IMood {
  duplicate_url: string
  elements: IElement[]
  name: string
  order: number
  pk: number
  soundset: string
  soundset_uuid: string
  unity_id: string
  update_mood_to_match_current_play_state_url: string
  url: string
  user_can_reorder_object: boolean
}

export interface IElement {
  element: string
  intensity: number
  mood: string
  plays: boolean
  url: string
  volume: number
}
