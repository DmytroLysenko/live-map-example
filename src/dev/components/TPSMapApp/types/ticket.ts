export interface ITicket {
  //Custom
  sectionId?: number
  rowId?: number

  id: number
  section: string
  row: string
  watermarks?: IWatermark[]

  // section: string
  // row: string
  // price: number
  // priceWithServiceFee: number
  // priceWithoutWatermarkFees: number
  // notes: string
  // quantities: number[]
  // paperlessAvailable: boolean
  // isTicketMaster: boolean
  // isMobile: boolean
  // fanPaperlessOnly: boolean
  // fanMobileOnly: boolean
  // electronicDeliveryAvailable: boolean
  // watermark?: string
  // watermarkSecondBullet?: string
  // isPromoteUrl: boolean
  // paperlessOnly: boolean
  // isFan: boolean
  // shared: never
  // owner: string
  // seatNumbers: string
  // taxAmount: number
  // internalNote?: string
  // providerId: number
  // shippingMethod: string
  // hasPaperlessDeliveryOptional: boolean
  // hasMobileDeliveryOptional: boolean
  // hasDeliveryNotes: boolean
  // deliveryNotes: string
  // isElectronicOnly: number
  // availableSeat: number
  // priceRange: string
}

export interface IWatermark {
  //Custom
  color: string

  id: number
  watermarkName: string
  sortOrder: number
  // feeType: number
  // feeAmount: number
  // hospitalityWatermarkId: number
  // isCallOnlyWatermark: boolean
  // callOnlyDisplayText?: string
}
