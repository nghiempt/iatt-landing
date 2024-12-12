import { IMAGES } from "./image";

const HIGHTLIGHTPRODUCT = [
  {
    id: 1,
    title:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    image: "/product.png",
    price: "399,000",
    rating: 5,
    review: 1,
  },
  {
    id: 2,
    title:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    image: "/product.png",
    price: "399,000",
    rating: 5,
    review: 1,
  },
];

const CATEGORIES = [
  {
    id: 0,
    name: "TẤT CẢ",
  },
  {
    id: 1,
    name: "ẢNH PLASTIC",
  },
  {
    id: 2,
    name: "KHUNG ẢNH",
  },
  {
    id: 3,
    name: "ALBUM",
  },
];

const PRODUCTS = [
  {
    id: 1,
    cate: 1,
    title:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "/product.png",
        color: "",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
      {
        id: 5,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "ColorImg5",
      },
      {
        id: 6,
        img: "/product.png",
        color: "#E37CF7",
        colorLabel: "ColorImg6",
      },
    ],
    price: "399,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    discount: "-7%",
    hasGift: true,
    soldAmount: "2k đã bán",
  },
  {
    id: 2,
    cate: 1,
    title:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#E37CF7",
        colorLabel: "ColorImg3",
      },
    ],
    price: "399,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 3,
    cate: 2,
    title: "Khung Ảnh Nhựa Cao Cấp Bền Bỉ",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728991261/iatt/IMG_7646_eojjmi.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728991377/iatt/IMG_7644_mi2bkg.jpg",
        color: "#8C32E1",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728991411/iatt/IMG_7643_pwnpci.jpg",
        color: "#E37CF7",
        colorLabel: "ColorImg3",
      },
    ],
    price: "75,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    discount: "-9%",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 4,
    cate: 2,
    title: "Khung Ảnh 3D Chất Lượng Cao 4K Siêu Nét",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994314/iatt/IMG_7583_rlk2is.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994206/iatt/IMG_7581_vxln6i.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994152/iatt/IMG_7579_xmyald.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728992035/iatt/IMG_7578_fzwoiq.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
    ],
    price: "220,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh 3D chất lượng 4K, mang lại chiều sâu và độ sắc nét tuyệt hảo cho ảnh của bạn.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 5,
    cate: 2,
    title: "Khung Ảnh Đĩa Xoay Độc Đáo Linh Hoạt",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994420/iatt/IMG_7599_sgiwq0.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994457/iatt/IMG_7606_dykzjs.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994484/iatt/IMG_7603_svfzch.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994516/iatt/IMG_7601_h6f8g8.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
      {
        id: 5,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994544/iatt/IMG_7600_ibpjrp.jpg",
        color: "#4C9E30",
        colorLabel: "ColorImg5",
      },
    ],
    price: "145,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh độc đáo với thiết kế đĩa xoay, cho phép xoay chuyển hình ảnh một cách linh hoạt.",
    discount: "-10%",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 6,
    cate: 2,
    title: "Khung Ảnh HD Siêu Nét Chất Lượng 4K",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994618/iatt/IMG_7608_vxzprx.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994639/iatt/IMG_7607_o4wvqm.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
    ],
    price: "180,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh HD chất lượng cao với độ phân giải 4K, mang lại sự sắc nét và sống động.",
    discount: "",
    hasGift: true,
    soldAmount: "2k đã bán",
  },
  {
    id: 7,
    cate: 2,
    title: "Khung Ảnh Để Bàn Nhỏ Gọn Sang Trọng",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994834/iatt/IMG_7630_nqibet.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994859/iatt/IMG_7629_qbhawb.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
    ],
    price: "60,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh để bàn tinh tế, thích hợp cho bàn làm việc hoặc không gian nhỏ.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 8,
    cate: 2,
    title: "Khung Ảnh Hoa Văn Trang Trí Nghệ Thuật",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994946/iatt/IMG_7585_dhs3oq.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994975/iatt/IMG_7588_pfdtjb.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728994998/iatt/IMG_7587_qcsemh.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
    ],
    price: "95,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh trang trí với họa tiết hoa văn tinh xảo, tạo điểm nhấn nghệ thuật cho ảnh.",
    discount: "",
    hasGift: true,
    soldAmount: "2k đã bán",
  },
  {
    id: 9,
    cate: 2,
    title: "Khung Ảnh Titan Cao Cấp Cỡ A1",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995128/iatt/IMG_7618_oxd8ut.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995152/iatt/IMG_7614_nxqso9.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995178/iatt/IMG_7568_yr22os.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995204/iatt/IMG_7566_zmlgqq.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
      {
        id: 5,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995229/iatt/IMG_7561_a3gudu.jpg",
        color: "#4C9E30",
        colorLabel: "ColorImg5",
      },
      {
        id: 6,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995253/iatt/IMG_7560_zhix6h.jpg",
        color: "#E37CF7",
        colorLabel: "ColorImg6",
      },
    ],
    price: "310,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh cỡ A1 với chất liệu titan bền bỉ, sang trọng, chịu được va đập và thời gian.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 10,
    cate: 2,
    title: "Khung Ảnh Titan Thanh Lịch Cỡ A2",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995381/iatt/IMG_7623_l6qxyh.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995415/iatt/IMG_7621_rdogea.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995435/iatt/IMG_7571_dxawlo.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995461/iatt/IMG_7569_w8ytha.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
      {
        id: 5,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995486/iatt/IMG_7565_arusmc.jpg",
        color: "#4C9E30",
        colorLabel: "ColorImg5",
      },
      {
        id: 6,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995509/iatt/IMG_7563_sk8uur.jpg",
        color: "#E37CF7",
        colorLabel: "ColorImg6",
      },
    ],
    price: "280,000",
    rating: 5,
    review: 1,
    description:
      "Khung titan kích thước A2, hoàn hảo cho những bức ảnh lớn, mang lại vẻ đẹp thanh lịch.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 11,
    cate: 2,
    title: "Khung Ảnh TA Độ Phân Giải Cao 4K",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995729/iatt/IMG_7593_if0ryh.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995766/iatt/IMG_7590_dohlmd.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
    ],
    price: "210,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh TA 4K dành cho những ai yêu thích độ phân giải cao và chi tiết sắc nét.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 12,
    cate: 2,
    title: "Khung Ảnh TA Siêu Nét Chất Lượng 6K",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995840/iatt/IMG_7596_cxa9cg.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995863/iatt/IMG_7595_tn6ess.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
    ],
    price: "270,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh TA chất lượng 6K siêu sắc nét, cho trải nghiệm thị giác đỉnh cao.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 13,
    cate: 2,
    title: "Khung Ảnh Tráng Gương Viền Bóng Sang Trọng",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995933/iatt/IMG_7615_ckwa6x.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995952/iatt/IMG_7612_n91ds5.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995971/iatt/IMG_7611_oqtwbj.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728995992/iatt/IMG_7567_mtwmtv.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
      {
        id: 5,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996015/iatt/IMG_7562_afgss0.jpg",
        color: "#4C9E30",
        colorLabel: "ColorImg5",
      },
      {
        id: 6,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996038/iatt/IMG_7555_p4bqwc.jpg",
        color: "#E37CF7",
        colorLabel: "ColorImg6",
      },
    ],
    price: "130,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh tráng gương với viền nổi bật, tạo hiệu ứng sáng bóng và sang trọng.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 14,
    cate: 3,
    title: "Album Ảnh Cán Màng Bảo Vệ Độ Bền Cao",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996259/iatt/IMG_7660_e9bgmw.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996279/iatt/IMG_7658_ykze64.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996308/iatt/IMG_7657_m4qoud.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996330/iatt/IMG_7656_b17gkt.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
      {
        id: 5,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996361/iatt/IMG_7651_qdrf5a.jpg",
        color: "#4C9E30",
        colorLabel: "ColorImg5",
      },
      {
        id: 6,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996383/iatt/IMG_7652_vvmxqy.jpg",
        color: "#E37CF7",
        colorLabel: "ColorImg6",
      },
    ],
    price: "95,000",
    rating: 5,
    review: 1,
    description:
      "Album ảnh cán màng bền đẹp, giúp bảo vệ hình ảnh lâu dài khỏi trầy xước và bụi bẩn.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 15,
    cate: 3,
    title: "Album Ảnh Cán Màng Mờ Chống Lóa",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996655/iatt/IMG_7691_ajiuec.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996685/iatt/IMG_7689_zigver.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996704/iatt/IMG_7688_jlobvm.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996726/iatt/IMG_7687_bhqf8z.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
      {
        id: 5,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996753/iatt/IMG_7686_twbcgh.jpg",
        color: "#4C9E30",
        colorLabel: "ColorImg5",
      },
    ],
    price: "89,000",
    rating: 5,
    review: 1,
    description:
      "Album ảnh cán màng mờ giúp giảm độ lóa, giữ cho hình ảnh luôn rõ ràng.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 16,
    cate: 3,
    title: "Moi Nhat",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996855/iatt/IMG_7669_mbjo7j.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996916/iatt/IMG_7668_tevby4.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996939/iatt/IMG_7667_fxwd5h.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728996961/iatt/IMG_7665_iolfrr.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
    ],
    price: "150,000",
    rating: 5,
    review: 1,
    description: `Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.
  Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.
  Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.
  Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.`,
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 17,
    cate: 3,
    title: "Album Ảnh Siêu Sắc Nét Không Cán Màng",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728997079/iatt/IMG_7680_xhaeis.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728997122/iatt/IMG_7679_iq4gdv.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728997152/iatt/IMG_7678_x1qqa0.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728997182/iatt/IMG_7675_zqrn92.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
      {
        id: 5,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728997213/iatt/IMG_7674_qxogfj.jpg",
        color: "#4C9E30",
        colorLabel: "ColorImg5",
      },
    ],
    price: "140,000",
    rating: 5,
    review: 1,
    description:
      "Album ảnh siêu sắc nét không cán màng, giữ nguyên vẻ chân thực của hình ảnh.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 18,
    cate: 3,
    title: "Album Ảnh Tráng Gương Cao Cấp Bóng Loáng",
    image: [
      {
        id: 1,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728997295/iatt/IMG_7673_gkhtod.jpg",
        color: "#F2A71B",
        colorLabel: "ColorImg1",
      },
      {
        id: 2,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728997323/iatt/IMG_7671_bi2vmr.jpg",
        color: "#7D6CFF",
        colorLabel: "ColorImg2",
      },
      {
        id: 3,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728997374/iatt/IMG_7670_npk1rn.jpg",
        color: "#1FB4A8",
        colorLabel: "ColorImg3",
      },
      {
        id: 4,
        img: "https://res.cloudinary.com/farmcode/image/upload/v1728997400/iatt/IMG_7664_asm6wv.jpg",
        color: "#D93A58",
        colorLabel: "ColorImg4",
      },
    ],
    price: "129,000",
    rating: 5,
    review: 1,
    description:
      "Album ảnh tráng gương với ảnh HD sắc nét và khung viền bóng loáng, mang lại sự sang trọng tuyệt đối.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
];

const CUSTOMERREVIEW = [
  {
    id: 1,
    name: "Anh Huy",
    review:
      "Tôi đã mua sản phẩm ở đây rất nhiều lần, sản phẩm tốt cho sức khỏe con, sẽ ủng hộ tiếp.",
    role: "Người Tiêu Dùng",
  },
  {
    id: 2,
    name: "Anh Hùng",
    review:
      "Tôi đã mua sản phẩm ở đây rất nhiều lần, sản phẩm tốt cho sức khỏe con, sẽ ủng hộ tiếp.",
    role: "Người Tiêu Dùng",
  },
  {
    id: 3,
    name: "Anh Trọng",
    review:
      "Tôi đã mua sản phẩm ở đây rất nhiều lần, sản phẩm tốt cho sức khỏe con, sẽ ủng hộ tiếp.",
    role: "Người Tiêu Dùng",
  },
];

const POSTS = [
  {
    id: 1,
    image: IMAGES.BLOG,
    title: "Bài viết mẫu - Nhóm sản phẩm",
    excerpt:
      "Giáng Sinh là dịp lễ thích hợp để mỗi người có thể bày tỏ lòng yêu thương của mình đến người thân yêu thông qua những món quà. Và nếu ba mẹ đang chưa biết nên...",
    date: "27.06.2024",
    author: "Thuc Nguyen",
    slug: "bai-viet-mau",
    content: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
  },
  {
    id: 2,
    image: IMAGES.BLOG_01,
    title: "Vì sao ba mẹ nên giải mã gen cho bé trong 1000 ngày đầu đời?",
    excerpt:
      "Trẻ trong 1000 ngày đầu đời không thể nói hay diễn đạt trọn vẹn thứ mình cần. Thay lời muốn nói của chính cơ thể trẻ, giải mã gen ở thời điểm này sẽ giúp ba mẹ bố...",
    date: "21.05.2024",
    author: "Thuc Nguyen",
    slug: "giai-ma-gen-cho-be",
    content: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
  },
  {
    id: 3,
    image: IMAGES.BLOG_02,
    title: "Bài viết mẫu - Nhóm sản phẩm",
    excerpt:
      "Giáng Sinh là dịp lễ thích hợp để mỗi người có thể bày tỏ lòng yêu thương của mình đến người thân yêu thông qua những món quà. Và nếu ba mẹ đang chưa biết nên...",
    date: "27.06.2024",
    author: "Thuc Nguyen",
    slug: "bai-viet-mau",
    content: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
  },
  {
    id: 4,
    image: IMAGES.BLOG,
    title: "Vì sao ba mẹ nên giải mã gen cho bé trong 1000 ngày đầu đời?",
    excerpt:
      "Trẻ trong 1000 ngày đầu đời không thể nói hay diễn đạt trọn vẹn thứ mình cần. Thay lời muốn nói của chính cơ thể trẻ, giải mã gen ở thời điểm này sẽ giúp ba mẹ bố...",
    date: "21.05.2024",
    author: "Thuc Nguyen",
    slug: "giai-ma-gen-cho-be",
    content: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
  },
];

export const DATA = {
  HIGHTLIGHTPRODUCT,
  PRODUCTS,
  CUSTOMERREVIEW,
  POSTS,
  CATEGORIES,
};
