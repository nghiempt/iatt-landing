"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AccountService } from "@/services/account";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Province {
  code: string;
  codename: string;
  districts: District[];
  division_type: string;
  name: string;
  phone_code: number;
}

export interface District {
  code: string;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
  wards: Ward[];
}

export interface Ward {
  code: string;
  codename: string;
  division_type: string;
  name: string;
  short_codename: string;
}

export interface UserData {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: string;
  ward?: string;
  district?: string;
  province?: string;
}

export interface FormData extends UserData {
  ward: string;
  district: string;
  province: string;
}

const EditProfileModal = ({ user }: { user: any }) => {
  const { toast } = useToast();

  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    phone: user?.phone || "",
    address: user?.address || "",
    ward: user?.ward || "",
    district: user?.district || "",
    province: user?.province || "",
  });

  React.useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://provinces.open-api.vn/api/?depth=3"
        );
        const data = await response.json();
        const formattedData = data.map((province: any) => ({
          ...province,
          code: province.code.toString(),
          districts: province.districts.map((district: any) => ({
            ...district,
            code: district.code.toString(),
            wards: district.wards.map((ward: any) => ({
              ...ward,
              code: ward.code.toString(),
            })),
          })),
        }));
        setProvinces(formattedData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  React.useEffect(() => {
    if (formData.province) {
      const selectedProvince = provinces.find(
        (p) => p.code === formData.province
      );
      if (selectedProvince) {
        setDistricts(selectedProvince.districts);

        const selectedDistrict = selectedProvince.districts.find(
          (d) => d.code === formData.district
        );
        if (selectedDistrict) {
          setWards(selectedDistrict.wards);
        }
      }
    }
  }, [formData.province, formData.district, provinces]);

  const handleProvinceChange = (provinceCode: string) => {
    const selectedProvince = provinces.find((p) => p.code === provinceCode);
    if (selectedProvince) {
      setDistricts(selectedProvince.districts);
      setWards([]);
      setFormData((prev) => ({
        ...prev,
        province: provinceCode,
        district: "",
        ward: "",
      }));
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (districtCode: string) => {
    const selectedDistrict = districts.find((d) => d.code === districtCode);
    if (selectedDistrict) {
      setWards(selectedDistrict.wards || []);
      setFormData((prev) => ({
        ...prev,
        district: districtCode,
        ward: "",
      }));
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (wardCode: string) => {
    setFormData((prev) => ({
      ...prev,
      ward: wardCode,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData?.name) {
      toast({
        title: "",
        description: "Vui lòng nhập tên!",
        variant: "destructive",
      });
      return false;
    }

    if (!formData?.address) {
      toast({
        title: "",
        description: "Vui lòng nhập địa chỉ giao hàng!",
        variant: "destructive",
      });
      return false;
    }
    if (!formData?.ward) {
      toast({
        title: "",
        description:
          "Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện, Phường/Xã.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData?.phone) {
      toast({
        title: "",
        description: "Vui lòng nhập số điện thoại!",
        variant: "destructive",
      });
      return false;
    }
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "",
        description:
          "Số điện thoại phải là một dãy số hợp lệ (10 đến 11 chữ số)! ",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const selectedProvince = provinces.find(
      (p) => p.code === formData.province
    );
    const selectedDistrict = districts.find(
      (d) => d.code === formData.district
    );
    const selectedWard = wards.find((w) => w.code === formData.ward);
    const formattedData = {
      ...formData,
      provinceName: selectedProvince?.name,
      districtName: selectedDistrict?.name,
      wardName: selectedWard?.name,
    };
    const response = await AccountService.updateAccount(
      user?._id,
      formattedData
    );
    if (response === false) {
      toast({
        title: "",
        description: "Số điện thoại đã được sử dụng!",
        variant: "destructive",
      });
      setLoading(false);
    } else {
      setLoading(false);
      window.location.href = "/tai-khoan?tab=profile";
    }
  };

  const updateDOM = () => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        avatar: user?.avatar || "",
        phone: user?.phone || "",
        address: user?.address || "",
        ward: user?.ward || "",
        district: user?.district || "",
        province: user?.province || "",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={updateDOM}>
        <Button className="inline-flex w-1/2 items-center justify-center rounded-lg bg-white border border-[rgb(var(--primary-rgb))] px-5 py-2.5 text-sm font-medium text-[rgb(var(--primary-rgb))] hover:text-white sm:w-auto gap-0">
          <svg
            className="-ms-0.5 me-1.5 h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
          Chỉnh sửa thông tin
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>CHỈNH SỬA THÔNG TIN</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                // onChange={handleInputChange}
                disabled={true}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="province">Tỉnh/Thành phố</Label>
              <Select
                value={formData.province}
                onValueChange={handleProvinceChange}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.code} value={province.code}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="district">Quận/Huyện</Label>
              <Select
                value={formData.district}
                onValueChange={handleDistrictChange}
                disabled={!formData.province || loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district.code} value={district.code}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ward">Phường/Xã</Label>
              <Select
                value={formData.ward}
                onValueChange={handleWardChange}
                disabled={!formData.district || loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phường/xã" />
                </SelectTrigger>
                <SelectContent>
                  {wards.map((ward) => (
                    <SelectItem key={ward.code} value={ward.code}>
                      {ward.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Số nhà, tên đường</Label>
              <Input
                id="address"
                name="address"
                placeholder="Ví dụ: 123 Đường ABC"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-[rgb(var(--primary-rgb))]">
            Lưu thay đổi
            {loading && <Loader className="animate-spin" size={48} />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
